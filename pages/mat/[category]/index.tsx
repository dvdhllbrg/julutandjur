import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetStaticProps } from "next";
import RecipeInfo from "../../../components/RecipeInfo";
import { Recipe } from "../../../components/RecipeInfoBox";
import recipes from '../../../recipes.json';

type CategoryRecipesProps = {
  recipes: Recipe[];
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function CategoryRecipes({ recipes }: CategoryRecipesProps) {
  const router = useRouter();
  const { category } = router.query;
  const [visibleRecipes, setVisibleRecipes] = useState(recipes);

  const filter = (sought: string) => {
    let foundRecipes;
    if (sought === "") {
      foundRecipes = recipes;
    } else {
      foundRecipes = recipes.filter((r) => {
        const search = new RegExp(`.*${sought}.*`, "i");
        return search.test(r.name) || search.test(r.category);
      });
    }
    setVisibleRecipes(foundRecipes);
  };

  const pageTitle = `${capitalize(category as string)} - Jul utan djur`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div>
        <input
          type="search"
          className="u-full-width searchbar"
          placeholder="Sök på recept eller kategori"
          onChange={(e) => filter(e.target.value)}
        />
        <div>
          <Link href="/mat/">
            <a>Mat</a>
          </Link>
          <span>
            &nbsp;&gt;&nbsp;
            <Link href={`/mat/${category}/`}>
              <a>{capitalize(category as string)}</a>
            </Link>
          </span>
        </div>
        <RecipeInfo
          visibleCategoryNames={[category as string]}
          visibleRecipes={visibleRecipes}
        />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filteredRecipes = recipes.filter((r: Recipe) => r.category === params?.category);
  return {
    props: {
      recipes: filteredRecipes,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = [
    ...new Set<string>(recipes.map((r: Recipe) => r.category)),
  ].map((category) => ({
    params: {
      category,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
