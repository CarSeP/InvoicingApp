import { NextResponse } from "next/server";
import { verify } from "paseto-ts/v4";

const onHandleAuthorization = async (authToken: string | null) => {
  if (!authToken)
    return NextResponse.json({ error: "No token provided" }, { status: 401 });

  try {
    await verify(process.env.publicKey || "", authToken);
    return null;
  } catch {
    return NextResponse.json(
      { error: "Invalid token provided" },
      { status: 401 }
    );
  }
};

export default onHandleAuthorization;
