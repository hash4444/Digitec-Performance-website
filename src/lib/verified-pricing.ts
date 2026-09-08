export interface VerifiedStartingPrice {
  fromAed?: number;
  /** Reference to the approved DIGI-TEC price, coverage and inclusions. */
  priceSource?: string;
}

export const formatVerifiedStartingPrice = (price: VerifiedStartingPrice): string | null =>
  typeof price.fromAed === 'number' && Number.isFinite(price.fromAed) && price.fromAed > 0 && price.priceSource?.trim()
    ? `From AED ${price.fromAed.toLocaleString('en-AE')}`
    : null;
