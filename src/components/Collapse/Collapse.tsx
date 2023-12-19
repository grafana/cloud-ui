import { css, cx } from '@emotion/css';
import React, { useState, type ReactNode, type UIEvent } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Icon, useStyles2 } from '@grafana/ui';

import { onEnter } from '../../utils/AriaUtils';

export interface CollapseProps {
  children: ReactNode;
  title: string | ReactNode;

  alternate?: boolean;
  isOpened?: boolean;
  isOpenedInitially?: boolean;
  onToggled?: (isOpened: boolean) => void;
  className?: string;
}

export const Collapse = ({
  children,
  title,
  alternate = false,
  isOpened: isOpenedControlled,
  isOpenedInitially = false,
  className,
  onToggled,
}: CollapseProps) => {
  const [isOpened, setIsOpened] = useState(isOpenedInitially);
  const styles = useStyles2(getStyles);

  const isControlled = isOpenedControlled !== undefined;
  const isActuallyOpened = isControlled ? isOpenedControlled : isOpened;

  function handleToggle(ev: UIEvent<HTMLDivElement>): void {
    ev.stopPropagation();
    if (!isControlled) {
      setIsOpened(!isActuallyOpened);
    }

    onToggled?.(!isActuallyOpened);
  }

  return (
    <div className={className}>
      <div className={styles.title} onKeyDown={onEnter(handleToggle)} tabIndex={0} role="button" onClick={handleToggle}>
        <Icon
          name={isActuallyOpened ? 'angle-down' : 'angle-right'}
          className={cx(alternate && styles.iconAlternate)}
        />
        {title}
      </div>
      <div className={cx(styles.children, isActuallyOpened && styles.childrenVisible)}>{children}</div>
    </div>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  title: css({
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer',
    flexFlow: 'row nowrap',
    margin: 0,
  }),
  iconAlternate: css({
    color: theme.colors.text.disabled,
  }),
  children: css({
    display: 'none',
    padding: `0 ${theme.spacing(2)}`,
  }),
  childrenVisible: css({
    display: 'block',
  }),
});
