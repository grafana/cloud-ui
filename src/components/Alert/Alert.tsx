import { css, cx } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Icon, useStyles2 } from '@grafana/ui';

type Props = {
  status: 'error' | 'success';
  children: React.ReactNode;
  className?: string;
  size?: 'base' | 'sm';
  ariaLabel?: string;
};

export const Alert = (props: Props) => {
  const styles = useStyles2(getStyles);
  const isSizeSm = props.size === 'sm';

  const icon =
    props.status === 'error' ? (
      <Icon size={isSizeSm ? 'sm' : 'md'} name="exclamation-triangle" className={styles.icon} />
    ) : (
      <Icon size={isSizeSm ? 'sm' : 'md'} name="check" className={styles.icon} />
    );

  return (
    <>
      <p
        className={cx(
          styles.alert,
          props.className,
          props.status === 'error' ? styles.error : styles.success,
          isSizeSm && styles.alertTextSm
        )}
      >
        {icon}
        <p role="alert" aria-label={props.ariaLabel || `${props.status} message`} className={styles.alertContent}>
          {props.children}
        </p>
      </p>
    </>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  error: css({
    color: theme.colors.error.text,
  }),
  alert: css({
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  }),
  success: css({
    color: theme.colors.success.text,
  }),
  icon: css({
    marginRight: 6,
  }),
  alertContent: css({
    marginBottom: 0,
  }),
  alertTextSm: css({
    fontSize: theme.typography.bodySmall.fontSize,
  }),
});
