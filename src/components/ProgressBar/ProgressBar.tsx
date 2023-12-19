import { css } from '@emotion/css';
import React from 'react';

import { useStyles2 } from '@grafana/ui';

interface Props {
  // Number between 0 and 1
  value: number;
  loading: boolean;
  showColors?: boolean;
  // Thresholds between 0 and 1 to determine the color of the progress bar
  // ex: under: 0.5, over: 0.75
  thresholds?: {
    under: number;
    over: number;
  };
  // Colors for the progress bar states
  // It is recommended to use the theme colors from '@grafana/runtime' config object
  // under: config.theme2.colors.warning.main (yellow)
  // well: config.theme2.colors.success.main (green)
  // max: config.theme2.colors.error.main (red)
  // default: config.theme2.colors.text.secondary (gray)
  colors?: {
    under: string;
    well: string;
    max: string;
    default: string;
  };
}

// using hard coded values as grafana-com doesn't import @grafana/runtime atm
const DEFAULT_COLORS = {
  under: '#FF9900',
  well: '#1A7F4B',
  max: '#D10E5C',
  default: 'rgba(204, 204, 220, 0.65)',
};

const DEFAULT_TRESHOLDS = {
  under: 0.5,
  over: 0.75,
};

export const ProgressBar = ({
  value,
  loading,
  showColors = true,
  thresholds = DEFAULT_TRESHOLDS,
  colors = DEFAULT_COLORS,
}: Props) => {
  const styles = useStyles2(getStyles);

  let color: string;
  if (value <= thresholds.under) {
    color = colors.under;
  } else if (value > thresholds.under && value <= thresholds.over) {
    color = colors.well;
  } else if (value > thresholds.over) {
    color = colors.max;
  } else {
    color = colors.default;
  }

  // When showColors is false, the progress bar will always be green
  if (!showColors) {
    color = colors.well;
  }

  return (
    <div className={styles.outerContainer} data-testid="usage-progress-bar">
      {loading ? (
        `Loading...`
      ) : (
        <div className={styles.progresContainer}>
          <div className={styles.progressOuter}>
            <div
              style={{
                width: calcUsed(value),
                backgroundColor: color,
              }}
              className={styles.progressInner}
              data-testid="progress-bar-used"
            ></div>
            <div
              style={{
                width: calcUnused(value || 0),
                backgroundColor: colors.default,
              }}
              className={styles.progressInner}
              data-testid="progress-bar-unused"
            ></div>
          </div>
          <p className={styles.progressPercentage}>{calcUsedString(value)}</p>
        </div>
      )}
    </div>
  );
};

// Returns a string to use in styles for the progress bar width
const calcUsed = (value: number) => {
  if (!value) {
    return 0;
  }
  if (value < 0.01 && value > 0) {
    return `0.5%`;
  }
  return `${(value * 100).toFixed(0)}%`;
};
// Returns a string to use in styles for the unused progress bar width
const calcUnused = (value: number) => {
  if (!value) {
    return `100%`;
  }
  const unused = 1 - value;
  if (unused < 0) {
    return `0%`;
  }
  return `${unused * 100}%`;
};
// Returns a string to use in the progress bar text, with a case for small values
const calcUsedString = (value: number) => {
  if (value == null) {
    return 'No data';
  }
  if (value < 0.01 && value > 0) {
    return `<1%`;
  }
  return `${(value * 100).toFixed(0)}%`;
};

const getStyles = () => ({
  progressOuter: css`
    width: 100%;
    height: 10px;
    border-radius: 3px;
    display: flex;
    overflow: hidden;
    margin-bottom: 5px;
  `,
  progressInner: css`
    height: 10px;
  `,
  progresContainer: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  outerContainer: css`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: baseline;
  `,
  progressPercentage: css`
    margin: 0;
    font-size: 13px;
  `,
});
