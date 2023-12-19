import { css, cx, keyframes } from '@emotion/css';
import React, { Fragment, useCallback, useState } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Icon, LoadingBar, useStyles2 } from '@grafana/ui';

import { CopyToClipboard } from './CopyToClipboard';

export const Clipboard = ({
  code,
  description,
  multipleLines = false,
  expandHeight = false,
  onClipboardCopy,
  highlightLines,
  showLoadingBar = false,
}: {
  code: string;
  description?: string;
  expandHeight?: boolean;
  multipleLines?: boolean;
  onClipboardCopy?: () => void;
  highlightLines?: number[];
  showLoadingBar?: boolean;
}) => {
  const styles = useStyles2((theme: GrafanaTheme2) => getStyles(theme, { multipleLines }));
  const [isCopySuccessful, setIsCopySuccessful] = useState(false);

  const handleOnClipboardCopy = useCallback(() => {
    setIsCopySuccessful(true);
    onClipboardCopy && onClipboardCopy();
  }, [onClipboardCopy]);

  const codeWithHighlights = code.split('\n').map((value, index) => (
    <Fragment key={index}>
      <span
        className={cx(styles.codeBackgroundLine, {
          [styles.codeHighlightedLine]: highlightLines?.includes(index),
        })}
      >
        {value}
      </span>
      {'\n'}
    </Fragment>
  ));

  return (
    <>
      {description && <p className={styles.description}>{description}</p>}
      <div className={styles.codeWrapper}>
        <div className={styles.loadingBarWrapper}>{showLoadingBar && <LoadingBar width={700} />}</div>
        <pre
          className={cx(styles.code, multipleLines && styles.codeMultipleLines, expandHeight && styles.expandHeight)}
        >
          {highlightLines ? codeWithHighlights : code}
        </pre>
        <CopyToClipboard className={styles.link} onClipboardCopy={handleOnClipboardCopy} clipboardText={code}>
          {!isCopySuccessful ? (
            <Icon className={styles.copy} name="copy" />
          ) : (
            <Icon className={styles.check} name="check" />
          )}
        </CopyToClipboard>
      </div>
    </>
  );
};

const rotateAppearAnimation = keyframes`
  0% {
    transform: rotate(-90deg);
    opacity: 0;
  }

  100% {
    transform: rotate(0);
    opacity: 1;
  }
`;

const getStyles = (theme: GrafanaTheme2, { multipleLines }: { multipleLines: boolean }) => ({
  codeWrapper: css({
    position: 'relative',
    display: multipleLines ? 'flex' : 'inline-block',
    minWidth: 200,
    flexDirection: 'column',
    alignItems: 'baseline',
    minHeight: 42,
    marginBottom: theme.spacing(4),
    border: `1px solid ${theme.colors.border.strong}`,
    borderRadius: '2px 2px 0 0',
    maxWidth: 700,
    background: theme.components.input.background,
    padding: 6,
  }),
  code: css({
    width: '100%',
    maxHeight: 104,
    whiteSpace: 'nowrap',
    marginBottom: 0,
    paddingRight: theme.spacing(5),
    background: 'none',
    borderStyle: 'none',
  }),
  codeMultipleLines: css({
    whiteSpace: 'break-spaces',
  }),
  description: css({
    fontSize: theme.typography.bodySmall.fontSize,
    lineHeight: theme.spacing(2),
    maginBottom: theme.spacing(1),
    color: theme.colors.text.primary,
  }),
  link: css({
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    width: 32,
    height: 32,
    top: multipleLines ? theme.spacing(1) : theme.spacing(0.5),
    right: multipleLines ? theme.spacing(1) : theme.spacing(0.5),
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    background: theme.colors.background.secondary,
    borderRadius: theme.shape.borderRadius(0.5),
    padding: 0,
  }),
  expandHeight: css({
    maxHeight: 600,
  }),
  check: css({
    animation: `${rotateAppearAnimation} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both`,
    copy: theme.colors.success.main,
  }),
  copy: css({
    color: theme.colors.text.primary,
  }),
  codeBackgroundLine: css({
    display: 'inline-block',
    width: '100%',
  }),
  loadingBarWrapper: css({
    overflow: 'hidden',
    minHeight: 1,
  }),
  codeHighlightedLine: css({
    color: theme.colors.info.contrastText,
    background: theme.colors.primary.main,
  }),
});
