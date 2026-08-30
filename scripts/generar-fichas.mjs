/**
 * Genera lib/fichas-data.json a partir de src/content/productos y src/content/lineas.
 *
 * Por que existe: el sitio es estatico. Si la ficha clinica se incrustara en el
 * HTML de /productos, ocultarla con CSS o JS no seria proteccion — el texto
 * seguiria en el codigo fuente de la pagina. Asi que la ficha viaja solo por
 * /api/productos/[id], y esa Pages Function necesita los datos en tiempo de
 * ejecucion. Este script se los deja empaquetados.
 *
 * Se ejecuta antes de `astro build` (ver package.json).
 */

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIR_PRODUCTOS = join(raiz, "src", "content", "productos");
const DIR_LINEAS = join(raiz, "src", "content", "lineas");
const SALIDA = join(raiz, "lib", "fichas-data.json");

async function leerColeccion(dir) {
  const archivos = (await readdir(dir)).filter((f) => f.endsWith(".json"));
  const salida = {};
  for (const archivo of archivos) {
    const id = archivo.replace(/\.json$/, "");
    salida[id] = JSON.parse(await readFile(join(dir, archivo), "utf8"));
  }
  return salida;
}

const productos = await leerColeccion(DIR_PRODUCTOS);
const lineas = await leerColeccion(DIR_LINEAS);

// Solo los campos reservados: lo publico ya lo renderiza Astro en la tarjeta.
const fichas = {};
for (const [id, p] of Object.entries(productos)) {
  fichas[id] = {
    nombre: p.nombre ?? "",
    lineaNombre: lineas[p.linea]?.nombre ?? p.linea ?? "",
    indicaciones: p.indicaciones ?? "",
    dosis: p.dosis ?? "",
    contraindicaciones: p.contraindicaciones ?? "",
    precauciones: p.precauciones ?? "",
    ram: p.ram ?? "",
    disolucion: p.disolucion ?? "",
    tabla: p.tabla && p.tabla.rows?.length ? p.tabla : null
  };
}

await mkdir(dirname(SALIDA), { recursive: true });
await writeFile(SALIDA, JSON.stringify(fichas, null, 2) + "\n", "utf8");
console.log(`fichas-data.json: ${Object.keys(fichas).length} productos`);
