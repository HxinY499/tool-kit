import { mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';

export default async function writeFileWithDir(
  filePath: string,
  data: Parameters<typeof writeFile>[1],
  options?: Parameters<typeof writeFile>[2]
) {
  const dirPath = dirname(filePath);
  await mkdir(dirPath, { recursive: true });
  return writeFile(filePath, data, options);
}
