import { MenuIcon } from "@heroicons/react/solid";
import { useState } from "react";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return(
       <button>
            <MenuIcon/>
       </button>
    )
}	