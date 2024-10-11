import { test, expect, vi } from 'vitest';
import { writeFile, mkdir } from 'fs/promises';
import { dirname } from 'path';
import { writeFileWithDir } from '..';

vi.mock('fs/promises', () => ({
  writeFile: vi.fn(),
  mkdir: vi.fn(),
  rm: vi.fn(),
}));

const filePath = `./tests/temp${Date.now()}/whatever/test.txt`;
const fileData = 'Hello, world!';

test('应先调用mkdir创建好目录，再调用writeFile创建文件', async () => {
  await writeFileWithDir(filePath, fileData);
  expect(mkdir).toHaveBeenCalledWith(dirname(filePath), { recursive: true });
  expect(writeFile).toHaveBeenCalledWith(filePath, fileData, undefined);
});
