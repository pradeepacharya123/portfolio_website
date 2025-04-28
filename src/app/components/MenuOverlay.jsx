import Link from "next/link";

const MenuOverlay = ({ links, onLinkClick }) => {
  return (
    <ul className="flex flex-col items-center justify-center space-y-6 mt-4 mb-6">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            href={link.path}
            onClick={onLinkClick}
            className="text-lg font-medium text-white bg-gradient-to-r from-primary-400 to-secondary-600 px-4 py-2 rounded-md hover:opacity-90 transition"
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
