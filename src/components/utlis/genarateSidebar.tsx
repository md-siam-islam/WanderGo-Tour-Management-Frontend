import type { ISidebaritema } from "@/Alltypes/Type";
import { Suspense } from "react";
import WanderGoLoader from "@/components/ui/WanderGoLoader";

export const genarateSidebar = (sidebarIteam: ISidebaritema[]) => {
  return sidebarIteam.flatMap((SideItem) =>
    SideItem.items.map((sectioItem) => {
      const Component = sectioItem.Component;
      return {
        path: sectioItem.url,
        Component: function SuspendedPage(props: any) {
          return (
            <Suspense fallback={<WanderGoLoader fullScreen={false} message="Loading dashboard view..." />}>
              <Component {...props} />
            </Suspense>
          );
        },
      };
    })
  );
};