import React, { ComponentProps, useCallback, useState } from 'react';

import { Button } from '@grafana/ui';

import { CopyToClipboard } from './CopyToClipboard';

interface Props extends ComponentProps<typeof Button> {
  clipboardText: string;
  onClipboardCopy?(): void;
  onClipboardError?(): void;
}

export const ClipboardButton = ({ onClipboardCopy, clipboardText, onClipboardError, ...buttonProps }: Props) => {
  const [isCopySuccessful, setIsCopySuccessful] = useState(false);

  const handleOnClipboardCopy = useCallback(() => {
    setIsCopySuccessful(true);
    onClipboardCopy && onClipboardCopy();
  }, [onClipboardCopy]);

  return (
    <CopyToClipboard
      icon={isCopySuccessful ? 'check' : 'copy'}
      onClipboardCopy={handleOnClipboardCopy}
      clipboardText={clipboardText}
      tooltip={isCopySuccessful ? 'Copied' : 'Copy'}
      onClipboardError={onClipboardError}
      {...buttonProps}
    />
  );
};
