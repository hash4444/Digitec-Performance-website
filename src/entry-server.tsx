import React from 'react';
import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppContent } from '@/App';
import {
  SeoCollectorProvider,
  type ResolvedSeoProps,
} from '@/hooks/use-seo';
import { publicRoutes } from '@/lib/route-manifest';

export interface RenderedRoute {
  html: string;
  seo?: ResolvedSeoProps;
}

export const getPublicRoutes = () => publicRoutes;

export const renderRoute = (url: string): Promise<RenderedRoute> =>
  new Promise((resolve, reject) => {
    const htmlChunks: Buffer[] = [];
    let seo: ResolvedSeoProps | undefined;
    let renderError: unknown;
    const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      stream.abort();
      reject(new Error(`SSR timed out for ${url}`));
    }, 30_000);

    const destination = new Writable({
      write(chunk, _encoding, callback) {
        // Decode only after joining chunks so multibyte text cannot be split.
        htmlChunks.push(Buffer.from(chunk));
        callback();
      },
    });

    destination.on('finish', () => {
      clearTimeout(timeout);
      if (renderError) {
        reject(renderError);
        return;
      }
      // React 18's streaming UTF-8 buffer can insert NUL padding at chunk
      // boundaries. NUL is not valid page text; remove only that padding.
      const html = Buffer.concat(htmlChunks).toString('utf8').replace(/\u0000/g, '');
      resolve({ html, seo });
    });
    destination.on('error', reject);

    const stream = renderToPipeableStream(
      <StaticRouter location={url}>
        <SeoCollectorProvider collect={(value) => { seo = value; }}>
          <AppContent />
        </SeoCollectorProvider>
      </StaticRouter>,
      {
        onAllReady() {
          stream.pipe(destination);
        },
        onShellError(error) {
          clearTimeout(timeout);
          reject(error);
        },
        onError(error) {
          renderError = error;
        },
      },
    );

  });
