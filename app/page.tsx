import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Button variant="default">
        <Link
          href={"/courses/seo-home-101"}
          className="flex items-center gap-2"
        >
          Go To Course <ArrowRight />
        </Link>
      </Button>
    </div>
  );
};

export default HomePage;
