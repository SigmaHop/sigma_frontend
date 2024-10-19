"use client";

import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";

export default function Home() {
  const { connectors, connect } = useConnect();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);
  return (
    mount && (
      <div className="flex flex-col w-full items-center gap-2">
        {connectors.map((connector) => (
          <Button key={connector.uid} onClick={() => connect({ connector })}>
            {connector.name}
          </Button>
        ))}
      </div>
    )
  );
}
