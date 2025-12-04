import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return new Response("Missing 'filename' query parameter", { status: 400 });
  }

  try {
    // put the path of your video directory here. We can eventually add this front-end to the docker server so we can the read the data that way.     
    const filePath = path.join('$RESULTS_DIRECTORY:/results', filename);
    // const filePath = path.join('C:/Users/jayle/Desktop/334-salamander-docker/results', filename);      -- Tyler's video path
    console.log("Trying to read from host path:", filePath);

    const fileContents = await readFile(filePath, 'utf8');

    return new Response(fileContents, {
      headers: { 'Content-Type': 'text/csv' },
    });
  } catch (error) {
    console.error("Error reading CSV:", error.message);
    return new Response(`Error reading CSV: ${error.message}`, { status: 500 });
  }
}
