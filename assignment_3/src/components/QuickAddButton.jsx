import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function QuickAddButton({ movieID }) {
  return (
    <>
      <button id="QuickAdd">
        <FontAwesomeIcon className="addIcon" icon={faPlus} />
      </button>
    </>
  );
}
