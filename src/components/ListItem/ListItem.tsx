import { Item } from "../../types/types";

const ListItem = ({
    item,
    onRemove,
    onPulse,
  }: {
    item: Item;
    onRemove: (item: Item) => void;
    onPulse: (item: Item) => void;
  }) => {
    return (
      <li onClick={() => {onPulse(item)}} className="li-item">
        {item.title}
        <button className="btn-remove" onClick={e => {
          e.stopPropagation();
          onRemove(item);
          }}> 
          x
        </button>
      </li>
    );
  };

  export default ListItem;