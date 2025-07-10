/* eslint-disable no-sequences */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { ReactNode, Fragment } from "react";
import RecipeInfoBox, { Recipe } from "./RecipeInfoBox";
import TitleRow from "./TitleRow";
import Row from "./Row";

type RecipeInfoProps = {
  visibleCategoryNames: string[];
  visibleRecipes: Recipe[];
};

type RecipesByCategory = {
  [key: string]: Recipe[];
};

export default function RecipeInfo({
  visibleCategoryNames,
  visibleRecipes,
}: RecipeInfoProps) {
  const categories: RecipesByCategory = visibleRecipes.reduce(
    (r: RecipesByCategory, v: Recipe) => (
      (r[v.category] || (r[v.category] = [])).push(v), r
    ),
    {}
  );
  const singleCategory = visibleCategoryNames.length === 1;
  const recipeInfo: ReactNode[] = [];
  let nrOfBoxes;
  visibleCategoryNames.forEach((categoryName, i) => {
    let recipeInfoBoxes = [];
    const recipeInfoRows = [];
    nrOfBoxes = Math.min(categories[categoryName]?.length || 0, 4);
    if (singleCategory) {
      nrOfBoxes = categories[categoryName]?.length || 0;
    } else if (typeof window !== "undefined" && window.innerWidth < 767) {
      nrOfBoxes = 1;
    }
    recipeInfo.push(
      <Fragment key={categoryName}>
        <TitleRow
          categoryName={categoryName}
          showMore={
            !singleCategory && categories[categoryName]?.length > nrOfBoxes
          }
        />
      </Fragment>
    );

    for (let j = 1; j <= nrOfBoxes; j += 1) {
      const recipe = categories[categoryName][j - 1];
      recipeInfoBoxes.push(
        <Fragment key={recipe.slug}>
          <RecipeInfoBox
            category={recipe.category}
            slug={recipe.slug}
            name={recipe.name}
            image={recipe.image}
            info={recipe.info}
          />
        </Fragment>
      );

      if (j % 4 === 0) {
        // eslint-disable-next-line react/no-array-index-key
        recipeInfoRows.push(
          <Row
            myKey={`${categoryName}_${i}`}
            recipeInfoBoxes={recipeInfoBoxes}
          />
        );
        recipeInfoBoxes = [];
      }
    }

    recipeInfoRows.push(
      <Row
        myKey={Math.round(categories[categoryName]?.length || 0 / 2)}
        recipeInfoBoxes={recipeInfoBoxes}
      />
    );
    recipeInfo.push(recipeInfoRows);
  });
  return <div className="recipeInfo">{recipeInfo}</div>;
}
