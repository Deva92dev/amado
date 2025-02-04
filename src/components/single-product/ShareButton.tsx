"use client";

import { LuShare2 } from "react-icons/lu";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  TwitterShareButton,
  LinkedinShareButton,
  TwitterIcon,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";

type ShareButtonProps = {
  productId: string;
  name: string;
};

const ShareButton = ({ name, productId }: ShareButtonProps) => {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/products/${productId}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="p-2">
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={10}
        className="flex items-center gap-x-2 justify-center w-full"
      >
        <TwitterShareButton url={shareLink} title={name}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareLink} title={name}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <WhatsappShareButton url={shareLink} title={name}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <FacebookShareButton url={shareLink} title={name}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
