import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "turnos.json");

export async function POST(req: Request) {
  try {
    const nuevoTurno = await req.json();

    // Leer turnos actuales
    const data = fs.readFileSync(filePath, "utf-8");
    const turnos = JSON.parse(data);

    // Agregar el nuevo turno
    turnos.push(nuevoTurno);

    // Guardar de nuevo en el archivo
    fs.writeFileSync(filePath, JSON.stringify(turnos, null, 2));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error guardando turno:", error);
    return NextResponse.json(
      { error: "No se pudo guardar el turno" },
      { status: 500 }
    );
  }
}
