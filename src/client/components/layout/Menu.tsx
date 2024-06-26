import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LuMenu } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouterState } from '@tanstack/react-router';
import { useWatch } from '@/hooks/useWatch';
import { cn } from '@/utils/style';

export const MobileLayoutMenu: React.FC<{
  list?: React.ReactNode;
}> = React.memo((props) => {
  const [open, setOpen] = useState(false);
  const state = useRouterState();

  useWatch([state.location.href], () => {
    setOpen(false);
  });

  return (
    <div className={cn(props.list ? 'opacity-100' : 'opacity-0')}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Button variant="outline" size="icon">
            <LuMenu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-11/12">
          <ScrollArea className="h-full">{props.list}</ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
});
MobileLayoutMenu.displayName = 'MobileLayoutMenu';
