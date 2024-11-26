import { useCallback, useEffect, useRef, useState } from "react";
import { Item, Mode } from "../../types/types";
import ListItem from "../ListItem/ListItem";
import ButtonWithCounter from "../ButtonWithCounter/ButtonWithCounter";
import RenderCountLabel from "../RenderCountLabel/RenderCountLabel";
import useRenderCounter from "../../hooks/useRenderCounter";

const List = () => {
    const counter = useRenderCounter();
    const [items, setItems] = useState<Item[]>([]);
    const [action, setAction] = useState<Mode>('add');
    const indexRef = useRef(1);
  
    const createDateId = (): string => `${Math.random().toString(36).substring(2, 9)}-${Date.now()}`;
  
    const createItem = (index: number): Item => ({
      title: `${index}-item`,
      id: createDateId(),
    });
  
    const handleChangeAction = useCallback(() => {
      setAction((prev) => (prev === 'add' ? 'remove' : 'add'));
    }, []);
  
    const handleRemoveSelectedItem = useCallback(() => {
      setItems((prev) => {
        if (prev.length === 0) {
          return prev;
        }
        return prev.slice(0, prev.length - 1);
      });
    }, []);
  
    
    const handleRemoveItem = useCallback((item: Item) => {
      setItems((prev) => prev.filter((value) => value !== item));
    }, []);
  
    const handleAddItemToEnd = useCallback(() => {
      setItems((prevItems) => {
        const newIndex = indexRef.current++;
        return [...prevItems, createItem(newIndex)];
      });
    }, []);
  
    const handleAddItemToStart = useCallback(() => {
      setItems((prevItems) => {
        const newIndex = indexRef.current++;
        return [createItem(newIndex), ...prevItems];
      });
    }, []);
  
    const handlePulseItem = useCallback((item: Item) => {
      setItems((prev) =>
        prev.map((i) => (i === item ? { ...i, id: createDateId() } : i))
      );
    }, []);
  
    useEffect(() => {
      const interval = setInterval(
        () => (action === 'add' ? handleAddItemToEnd() : handleRemoveSelectedItem()),
        1000
      );
      return () => clearInterval(interval);
    }, [action, handleAddItemToEnd, handleRemoveSelectedItem]);
    return (
      <ul className="list">
        <RenderCountLabel label="List" count={counter} />
        <br />
        <ButtonWithCounter
          onClick={handleChangeAction}
          buttonText={`change mode: ${action}`}
        />
        <br />
        <div className="btn-actions">
          <ButtonWithCounter
            onClick={handleAddItemToStart}
            buttonText={'Add to start'}
          />
          <ButtonWithCounter
            onClick={handleAddItemToEnd}
            buttonText={'Add to end'}
            buttonClass={'button'}
          />
        </div>
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onRemove={handleRemoveItem}
            onPulse={handlePulseItem}
          />
        ))}
      </ul>
    );
  };

  export default List;