
import React from "react";

const ModelFooter = () => {
  return (
    <div className="mt-12 text-center">
      <p className="text-muted-foreground">
        Which model a provider offers changes; the container does not. The
        <a href="https://docs.hanzo.ai/docs/services/operative" className="text-foreground hover:text-foreground/70 ml-1">
          documentation
        </a> lists what each one currently accepts.
      </p>
    </div>
  );
};

export default ModelFooter;
