
{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.vite
    pkgs.nodePackages.typescript
    pkgs.nodePackages.typescript-language-server
  ];
}
