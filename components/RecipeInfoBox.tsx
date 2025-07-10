import Link from "next/link";
import Image from "next/image";

export type Recipe = {
  category: string;
  slug: string;
  name: string;
  image: string;
  info: string;
  src: string;
  srcName: string;
  photographer: string;
  ingredients: string;
  text: string;
};

export default function RecipeInfoBox({
  category,
  slug,
  image,
  name,
  info,
}: Partial<Recipe>) {
  return (
    <div className="recipeInfoBox three columns">
      <Link href={`/mat/${category}/${slug}/`}>

        <Image
          alt={`Photograph of ${name}`}
          src={`/img/${image}`}
          width="450"
          height="300"
          className="u-max-full-width"
        />
        <div className="recipeInfoText">
          <h6>{name}</h6>
          <p>{info}</p>
        </div>

      </Link>
    </div>
  );
}
