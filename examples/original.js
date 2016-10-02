type Props = {
  links: Array<Link>
}

type Link = {
  label: string,
  visible: bool,
  url: Url
}

type Url = string | null;

const MenuItem = ({label, link, offset} : Props) => (
  `<li href="${link}" tabindex="${offset}">${label}</li>`
);

export default MenuItem;
