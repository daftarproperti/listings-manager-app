import React, {
  useMemo,
  useState,
  type CSSProperties,
  type PropsWithChildren,
  type ReactNode,
} from 'react'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
  type Active,
  type DropAnimation,
  type UniqueIdentifier,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type BaseItem = {
  id: UniqueIdentifier
}

type Props<T extends BaseItem> = {
  items: T[]
  setItems(items: T[]): void
  renderItem(item: T): ReactNode
} & Omit<React.HTMLAttributes<HTMLUListElement>, 'id'>

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
}

export function SortableList<T extends BaseItem>({
  items,
  setItems,
  renderItem,
  ...props
}: Props<T>) {
  const [active, setActive] = useState<Active | null>(null)
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items],
  )
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active)
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id)
          const overIndex = items.findIndex(({ id }) => id === over.id)

          setItems(arrayMove(items, activeIndex, overIndex))
        }
        setActive(null)
      }}
      onDragCancel={() => {
        setActive(null)
      }}
    >
      <SortableContext items={items}>
        <ul {...props} role="application">
          {items.map((item) => (
            <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
          ))}
        </ul>
      </SortableContext>
      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeItem ? renderItem(activeItem) : null}
      </DragOverlay>
    </DndContext>
  )
}

type SortableItemProps = {
  id: UniqueIdentifier
} & Omit<React.HTMLAttributes<HTMLLIElement>, 'id'>

const SortableItem: React.FC<PropsWithChildren<SortableItemProps>> = ({
  children,
  id,
  ...props
}) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <li
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </li>
  )
}

SortableList.Item = SortableItem
