import { ReactNode } from "react";

type RowProps = {
  myKey: string | number;
  recipeInfoBoxes: ReactNode;
};

export default function Row({ myKey, recipeInfoBoxes }: RowProps) {
  return (
    <div key={myKey} className="row">
      {recipeInfoBoxes}
    </div>
  );
}
