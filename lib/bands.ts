/**
 * The wide band's geometry, mirrored from `--band-wide` / `--band-gutter` in
 * app/globals.css — a custom property cannot reach an image's `sizes`, so the
 * numbers have to exist twice. Only twice: everything that declares a slot on
 * the wide band derives it from here.
 */
export const BAND_WIDE_REM = 64
export const BAND_GUTTER_REM = 1

/** A band is gutter-bound until the viewport can hold its full width. */
export const BAND_WIDE_MIN_REM = BAND_WIDE_REM + BAND_GUTTER_REM * 2

/** `sizes` for anything that fills the wide band edge to edge. */
export const BAND_WIDE_SIZES = `(min-width: ${BAND_WIDE_MIN_REM}rem) ${BAND_WIDE_REM}rem, 100vw`
