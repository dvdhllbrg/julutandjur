/* eslint-disable no-sequences */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { ReactNode } from 'react';
import RecipeInfoBox, { Recipe } from './RecipeInfoBox';
import TitleRow from './TitleRow';
import Row from './Row';

type RecipeInfoProps = {
  visibleCategoryNames: string[];
  visibleRecipes: Recipe[];
};

type RecipesByCategory = {
  [key: string]: Recipe[]
};

export default function RecipeInfo({ visibleCategoryNames, visibleRecipes }: RecipeInfoProps) {
  const categories: RecipesByCategory = visibleRecipes.reduce((r: RecipesByCategory, v: Recipe) => ((r[v.category] || (r[v.category] = [])).push(v), r), {});
  const singleCategory = visibleCategoryNames.length === 1;
  const recipeInfo: ReactNode[] = [];
  let nrOfBoxes;
  visibleCategoryNames.forEach((categoryName, i) => {
    let recipeInfoBoxes = [];
    const recipeInfoRows = [];
    nrOfBoxes = Math.min(categories[categoryName].length, 4);
    if (singleCategory) {
      nrOfBoxes = categories[categoryName].length;
    } else if (typeof window !== 'undefined' && window.innerWidth < 767) {
      nrOfBoxes = 1;
    }
    recipeInfo.push(<TitleRow key={categoryName} categoryName={categoryName} showMore={!singleCategory && categories[categoryName].length > nrOfBoxes} />);

    for (let j = 1; j <= nrOfBoxes; j += 1) {
      const recipe = categories[categoryName][j - 1];
      recipeInfoBoxes.push(<RecipeInfoBox key={recipe.slug} category={recipe.category} slug={recipe.slug} name={recipe.name} image={recipe.image} info={recipe.info} />);

      if (j % 4 === 0) {
        // eslint-disable-next-line react/no-array-index-key
        recipeInfoRows.push(<Row key={`${categoryName}_${i}`} recipeInfoBoxes={recipeInfoBoxes} />);
        recipeInfoBoxes = [];
      }
    }

    recipeInfoRows.push(<Row key={Math.round(categories[categoryName].length / 2)} recipeInfoBoxes={recipeInfoBoxes} />);
    recipeInfo.push(recipeInfoRows);
  });
  return (
    <div className="recipeInfo">
      {recipeInfo}
    </div>
  );
}
