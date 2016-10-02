type Props = {
  label: string,
  link: Url,
  offset: number,
}

type Url = string | null;

const MenuItem = ({label, link, offset} : Props) => (
  `<li href="${link}" tabindex="${offset}">${label}</li>`
);

export default MenuItem;
