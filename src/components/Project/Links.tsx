import AppStoreIcon from "@/assets/images/appstore.svg";
import GithubIcon from "@/assets/images/github.svg";
import PlayStoreIcon from "@/assets/images/playstore.svg";
import WebIcon from "@/assets/images/web.svg";

const Links = ({
  repoUrl,
  webUrl,
  appStoreUrl,
  playStoreUrl,
}: {
  repoUrl: string;
  webUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
}) => {
  const iconClass =
    "hover:text-PRIMARY_HEAVY dark:hover:text-GRAY_HEAVY md:fill-current fill-BLACK dark:fill-white";

  return (
    <div className="flex gap-1">
      {repoUrl && (
        <a target="_blank" rel="noreferrer" href={repoUrl} className="w-fit">
          <GithubIcon className={iconClass} />
        </a>
      )}
      {webUrl && (
        <a target="_blank" rel="noreferrer" href={webUrl} className="w-fit">
          <WebIcon className={iconClass} />
        </a>
      )}
      {appStoreUrl && (
        <a target="_blank" rel="noreferrer" href={appStoreUrl} className="w-fit" aria-label="App Store">
          <AppStoreIcon className={iconClass} />
        </a>
      )}
      {playStoreUrl && (
        <a target="_blank" rel="noreferrer" href={playStoreUrl} className="w-fit" aria-label="Google Play">
          <PlayStoreIcon className={iconClass} />
        </a>
      )}
    </div>
  );
};

export default Links;
