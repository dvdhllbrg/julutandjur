import { ReactNode } from 'react';

type RowProps = {
  key: string | number;
  recipeInfoBoxes: ReactNode;
};

export default function Row({ key, recipeInfoBoxes }: RowProps) {
  return (
    <div key={key} className="row">
      {recipeInfoBoxes}
    </div>
  );
}
