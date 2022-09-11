import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { publicKey } from "@project-serum/anchor/dist/cjs/utils";
import { SolSocial } from "../target/types/sol_social";

describe("sol_social", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolSocial as Program<SolSocial>;
  const newUserAccount = anchor.web3.Keypair.generate();
  const nameUpdateAccount = anchor.web3.Keypair.generate();


  // it("creates new user",async () => {
  //   const [newUserPDA, _] = await publicKey.findProgramAddressSync(
  //     [
  //       anchor.utils.bytes.utf8.encode("new-user"),
  //       anchor.getProvider().publicKey.toBuffer()
  //     ],
  //     program.programId
  //   );
  //   await program.methods.newUser("test").accounts({
  //     user: anchor.getProvider().publicKey,
  //     userAccount: newUserPDA,
  //   })
  //   .rpc();
  //   const newPostAccount0 = await program.account.user.fetch(newUserPDA);
  //   console.log(newPostAccount0);
  // })


  it("creates new user", async () => {
    const tx = await program.methods.newUser("test").accounts(
      {
        userAccount: newUserAccount.publicKey,
        user: anchor.getProvider().publicKey,
      },
      )
    .signers([newUserAccount])
    .rpc();
    const newPostAccount0 = await program.account.user.fetch(newUserAccount.publicKey);
    console.log(newPostAccount0);
    
    let userDetails = await program.account.user.fetch(newUserAccount.publicKey);
    console.log("Your transaction signature", tx);
  });

  it("updates username", async () => {
  //  const ix = await program.methods.updateUsername("&mut username")
  //  const userAccountAddress = (await ix.pubkeys()).userAccount
  // //  console.log(userAccountAddress.toString());

  //  const tx = await ix.rpc()
  //  console.log("Your transaction signature", tx);

  //  let userDetails = await program.account.user.fetch(userAccountAddress);
  //  console.log(`Name: ${userDetails.username}` )

  //   const newPostAccount0 = await program.account.user.fetch(newUserAccount.publicKey);
  //   console.log(newPostAccount0);

  });

});
