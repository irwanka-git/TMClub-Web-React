import { Transition } from "@headlessui/react";
import React, { useState, useEffect } from "react";
const SlideDown =({children}) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
     setShow(true)
  },[]);
  return (
    <Transition
      show={show}
      enter="transform transition ease-in-out duration-1000"
      enterFrom="opacity-0 translate-y-[-4rem]"
      enterTo="opacity-100 translate-y-0"
      leave="transform transition ease-in-out duration-1000"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-full"
    >
       {children} 
    </Transition>
  );
}

export default SlideDown