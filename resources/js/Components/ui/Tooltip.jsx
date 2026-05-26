import { Tooltip as ArkTooltip } from '@ark-ui/react';

export default function Tooltip({ content, children, placement = 'right' }) {
  return (
    <ArkTooltip.Root positioning={{ placement }}>
      <ArkTooltip.Trigger asChild>{children}</ArkTooltip.Trigger>
      <ArkTooltip.Positioner>
        <ArkTooltip.Content className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-lg z-50">
          {content}
        </ArkTooltip.Content>
      </ArkTooltip.Positioner>
    </ArkTooltip.Root>
  );
}
