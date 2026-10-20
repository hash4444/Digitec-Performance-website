import { useEffect, useRef, useState } from 'react';
import { Instagram } from 'lucide-react';
import { useLocale } from '@/i18n/use-locale';
import './AboutVideoStrip.css';

const films = Array.from({ length: 8 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  return { number, src: `/videos/about/video-${number}.mp4`, poster: `/videos/about/video-${number}-poster.jpg` };
});
type Film = (typeof films)[number];
const instagramUrl = 'https://www.instagram.com/digi_tec/';

function Preview({ film, paused }: { film: Film; paused: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => { if (visible && !paused) setLoaded(true); }, [visible, paused]);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (loaded && visible && !paused) {
      element.muted = true;
      void element.play().catch(() => { /* The poster and Instagram link remain usable if autoplay is blocked. */ });
    } else element.pause();
  }, [loaded, visible, paused]);

  return <>
    <img src={film.poster} alt="" width="720" height="1280" loading="lazy" decoding="async" className="about-video-strip__poster" />
    <video ref={video} src={loaded ? film.src : undefined} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}
      onPlaying={() => setPlaying(true)} className={`about-video-strip__preview${playing ? ' is-playing' : ''}`} />
  </>;
}

export default function AboutVideoStrip() {
  const { isArabic } = useLocale();
  const viewport = useRef<HTMLDivElement>(null);
  const firstGroup = useRef<HTMLDivElement>(null);
  const cycleWidth = useRef(0);
  const pointerDown = useRef(false);
  const manualPauseUntil = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = reducedMotion || !onScreen || pageHidden || hovered || focused;
  const previewsPaused = reducedMotion || !onScreen || pageHidden;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setPageHidden(document.hidden);
    const releasePointer = () => { pointerDown.current = false; };
    updatePreference(); updateVisibility();
    preference.addEventListener('change', updatePreference);
    document.addEventListener('visibilitychange', updateVisibility);
    window.addEventListener('pointerup', releasePointer);
    window.addEventListener('pointercancel', releasePointer);
    return () => {
      preference.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', updateVisibility);
      window.removeEventListener('pointerup', releasePointer);
      window.removeEventListener('pointercancel', releasePointer);
    };
  }, []);

  useEffect(() => {
    const element = viewport.current, group = firstGroup.current;
    if (!element || !group) return;
    const measure = () => { cycleWidth.current = group.getBoundingClientRect().width; };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(group);
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(element);
    return () => { resize.disconnect(); observer.disconnect(); };
  }, []);

  useEffect(() => {
    const element = viewport.current;
    if (!element || paused) return;
    let frame = 0, last = 0, position = element.scrollLeft;
    const advance = (now: number) => {
      const elapsed = last ? Math.min((now - last) / 1000, 0.064) : 0;
      last = now;
      if (pointerDown.current || now < manualPauseUntil.current) position = element.scrollLeft;
      else if (cycleWidth.current > 0) {
        position = (position + elapsed * 32) % cycleWidth.current;
        element.scrollLeft = position;
      }
      frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [paused]);

  function move(direction: number) {
    const element = viewport.current;
    if (!element) return;
    if (direction < 0 && element.scrollLeft < 1) element.scrollLeft = cycleWidth.current;
    const card = firstGroup.current?.querySelector<HTMLElement>('.about-video-strip__card');
    element.scrollBy({ left: direction * ((card?.offsetWidth ?? 240) + 20), behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  return <section className="about-video-strip theme-dark-section" aria-labelledby="about-films-title" data-about-videos>
    <div className="about-video-strip__heading">
      <div>
        <p className="about-video-strip__eyebrow">{isArabic ? 'ديجي-تك بالفيديو' : 'DIGI-TEC in motion'}</p>
        <h2 id="about-films-title">{isArabic ? 'تعرّف على ديجي-تك' : 'A closer look at DIGI-TEC'}</h2>
      </div>
    </div>

    <div ref={viewport} className="about-video-strip__viewport" dir="ltr" role="region" tabIndex={0}
      aria-label={isArabic ? 'فيديوهات ديجي-تك، مرّر أفقياً لاستعراضها' : 'DIGI-TEC videos, scroll horizontally to browse'}
      onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }} onPointerLeave={() => setHovered(false)}
      onPointerDown={() => { pointerDown.current = true; }} onWheel={() => { manualPauseUntil.current = performance.now() + 1800; }}
      onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}
      onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); } }}>
      <div className="about-video-strip__track">
        {[false, true].map(duplicate => <div key={String(duplicate)} ref={duplicate ? undefined : firstGroup} className="about-video-strip__group" aria-hidden={duplicate ? true : undefined}>
          {films.map(film => <a key={film.number} href={instagramUrl} target="_blank" rel="noopener noreferrer" className="about-video-strip__card" tabIndex={duplicate ? -1 : 0} dir={isArabic ? 'rtl' : 'ltr'}
            aria-label={isArabic ? 'زر حساب ديجي-تك على إنستغرام (يفتح في علامة تبويب جديدة)' : 'Visit @digi_tec on Instagram (opens in a new tab)'}
            onPointerDown={event => { if (duplicate && event.pointerType === 'mouse') event.preventDefault(); }}>
            <Preview film={film} paused={previewsPaused} />
            <span className="about-video-strip__caption"><span className="about-video-strip__social"><Instagram size={18} aria-hidden="true" /></span><bdi>@digi_tec</bdi></span>
          </a>)}
        </div>)}
      </div>
    </div>
  </section>;
}
