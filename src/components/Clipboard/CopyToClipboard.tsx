import React, { ComponentProps, MouseEvent } from 'react';

import { Button } from '@grafana/ui';

import { useSelectAndCopy } from '../../hooks/useSelectAndCopy';

interface Props extends ComponentProps<typeof Button> {
  clipboardText: string;
  onClipboardCopy?(): void;
  onClipboardError?(): void;
}

export const CopyToClipboard = (props: Props) => {
  const { clipboardText, onClipboardCopy, onClipboardError, ...buttonProps } = props;
  const handleClick = (ev: MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(clipboardText).then(
      () => {
        /* clipboard successfully set */
        onClipboardCopy && onClipboardCopy();
      },
      () => {
        /* clipboard write failed */
        onClipboardError && onClipboardError();
      }
    );

    // adding this so that users can handle additional logic after click such as stopping propagation
    props.onClick && props.onClick(ev);
  };

  useSelectAndCopy(clipboardText, onClipboardCopy);

  return (
    <Button fill={'text'} {...buttonProps} onClick={handleClick} type="button">
      {buttonProps.children}
    </Button>
  );
};
