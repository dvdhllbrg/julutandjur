import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";
import { Recipe as RecipeType } from "../../../components/RecipeInfoBox";
import recipes from '../../../recipes.json';

type RecipeProps = {
  recipe: RecipeType;
};

const nl2br = (str: string) => ({
  __html: `${str}`.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1<br/>$2"),
});
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function Recipe({ recipe }: RecipeProps) {
  const pageTitle = `${recipe.name} - Jul utan djur`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div>
        <div>
          <Link href="/mat/">
            Mat
          </Link>
          <span>
            &nbsp;&gt;&nbsp;
            <Link href={`/mat/${recipe.category}/`}>
              {capitalize(recipe.category)}
            </Link>
          </span>
          <span>
            &nbsp;&gt;&nbsp;
            <Link href={`/mat/${recipe.category}/${recipe.slug}/`}>
              {recipe.name}
            </Link>
          </span>
        </div>
        <div className="recipeInfo">
          <div className="row">
            <div className="main-recipe-info seven columns">
              <h2>{recipe.name}</h2>
              <p>
                Av <a href={recipe.src}>{recipe.srcName}</a>.
              </p>
              <div dangerouslySetInnerHTML={nl2br(recipe.info)} />
            </div>
            <Image
              alt={`Photograph of ${recipe.name}`}
              src={`/img/${recipe.image}`}
              width="900"
              height="500"
              className="u-max-full-width five columns recipe-image"
            />
            <span className="photographer">Foto: {recipe.photographer}.</span>
          </div>
          <div className="row">
            <div className="three columns">
              <h4>Ingredienser</h4>
              <div dangerouslySetInnerHTML={nl2br(recipe.ingredients)} />
            </div>
            <div className="nine columns instructions">
              <h4>Gör så här</h4>
              <div dangerouslySetInnerHTML={nl2br(recipe.text)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const recipe = recipes.find((r: RecipeType) => r.slug === params?.recipe);

  if (!recipe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipe,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = recipes.map((r: RecipeType) => ({
    params: {
      category: r.category,
      recipe: r.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
