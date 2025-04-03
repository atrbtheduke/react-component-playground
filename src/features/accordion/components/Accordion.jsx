import { useState } from 'react';
import AccordionItem from './AccordionItem';

const Accordion = ({ items }) => {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="mt-8 space-y-2">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          {...item}
          isActive={activeId === item.id}
          onToggle={() => setActiveId(activeId === item.id ? null : item.id)}
        />
      ))}
    </div>
  );
};

export default Accordion;