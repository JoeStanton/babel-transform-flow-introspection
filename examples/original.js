type Props = {
  label: string,
  link: Url
}

type Url = string | null;

export default MenuItem = ({label, link} : Props) => (
  `<li href="${link}">${label}</li>`
);
