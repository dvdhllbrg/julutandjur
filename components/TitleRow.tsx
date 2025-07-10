import Link from "next/link";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

type TitleRowProps = {
  categoryName: string;
  showMore: boolean;
};

export default function TitleRow({ categoryName, showMore }: TitleRowProps) {
  return (
    <div className="row">
      <h4 className="title-row" key={categoryName}>
        <Link href={`/mat/${categoryName}/`}>
          {capitalize(categoryName)}
        </Link>
      </h4>
      {showMore ? (
        <Link href={`/mat/${categoryName}/`} className="show-more">
          Fler&nbsp;»
        </Link>
      ) : null}
    </div>
  );
}
