import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { Recipe as RecipeType } from '../../../components/RecipeInfoBox';
import connectToDatabase from '../../../util/mongodb';

type RecipeProps = {
  recipe: RecipeType;
};

const nl2br = (str: string) => ({ __html: (`${str}`).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br/>$2') });
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function Recipe({ recipe }: RecipeProps) {
  return (
    <>
      <Head>
        <title>
          { recipe.name }
          {' '}
          - Jul utan djur
        </title>
      </Head>
      <div>
        <div>
          <Link href="/mat/"><a>Mat</a></Link>
          <span>
            &nbsp;&gt;&nbsp;
            <Link href={`/mat/${recipe.category}/`}><a>{capitalize(recipe.category)}</a></Link>
          </span>
          <span>
            &nbsp;&gt;&nbsp;
            <Link href={`/mat/${recipe.category}/${recipe.slug}/`}><a>{recipe.name}</a></Link>
          </span>
        </div>
        <div className="recipeInfo">
          <div className="row">
            <div className="main-recipe-info seven columns">
              <h2>{recipe.name}</h2>
              <p>
                Av
                {' '}
                <a href={recipe.src}>{recipe.srcName}</a>
                .
              </p>
              <div dangerouslySetInnerHTML={nl2br(recipe.info)} />
            </div>
            <Image alt={`Photograph of ${recipe.name}`} src={`/img/${recipe.image}`} width="900" height="500" className="u-max-full-width five columns recipe-image" />
            <span className="photographer">
              Foto:
              {' '}
              {recipe.photographer}
              .
            </span>
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
  const { db } = await connectToDatabase();
  const recipe = await db
    .collection('recipes')
    .findOne({ slug: params?.recipe }, { projection: { _id: 0 } });

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
  const { db } = await connectToDatabase();
  const recipes = await db
    .collection('recipes')
    .find({})
    .project({ _id: 0 })
    .limit(40)
    .toArray();

  const paths = recipes.map((r) => ({
    params:
      {
        category: r.category,
        recipe: r.slug,
      },
  }));

  return {
    paths,
    fallback: false,
  };
};
