import React, { useEffect, useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(count);
  }, []);

  return (
    <div>
      Hello World
    </div>
  );
}
