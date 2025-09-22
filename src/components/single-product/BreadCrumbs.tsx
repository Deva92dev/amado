import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

type BreadCrumbsProps = {
  name: string;
};

const BreadCrumbs = ({ name }: BreadCrumbsProps) => {
  return (
    <Breadcrumb className="pt-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="capitalize text-lg">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/products" className="capitalize text-lg">
            Products
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize text-lg">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
