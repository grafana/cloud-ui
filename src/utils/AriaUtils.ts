export function onEnter<ElementType>(
  handler?: (ev: React.KeyboardEvent<ElementType>) => void
): (ev: React.KeyboardEvent<ElementType>) => void {
  return (ev: React.KeyboardEvent<ElementType>) => {
    return ev?.key === 'Enter' && handler && handler(ev);
  };
}
