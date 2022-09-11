import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { publicKey } from "@project-serum/anchor/dist/cjs/utils";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { BN } from "bn.js";
import { SolSocial } from "../target/types/sol_social";

describe("sol_social", () => {

  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolSocial as Program<SolSocial>;
  const newUserAccount = anchor.web3.Keypair.generate();
  const nameUpdateAccount = anchor.web3.Keypair.generate();


  it("creates new user",async () => {
    const publicKey = anchor.AnchorProvider.local().wallet.publicKey;
    const [newUserPDA] = await anchor.web3.PublicKey.findProgramAddress([
      utf8.encode('new_user'),
      publicKey.toBuffer(),
    ],
    program.programId
    );
    
    console.log("newUserPDA", newUserPDA);
    await program.methods.newUser("testName").accounts({
      userAccount: newUserPDA,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();
    const newUserAccount = await program.account.user.fetch(newUserPDA);
    console.log(newUserAccount);
  })

  // it("Creating a new account for user", async () => {
  //   const ix = await program.methods.newUser("newUser1")
  //   const newUserAddress = (await ix.pubkeys()).userAccount
  //   console.log("User facebook address :: ", newUserAddress.toString());
   
  //   const tx = await ix.rpc()
  //   console.log("Your transaction signature", tx);
  
  //   let userDetails = await program.account.user.fetch(newUserAddress);
  //   console.log(`Created a new account with following details \n Name :: ${userDetails.username} \n Status :: ${userDetails.status} \n Twitter :: ${userDetails.twitter}`)
  // });



  // it("creates new user", async () => {
  //   const tx = await program.methods.newUser("test").accounts(
  //     {
  //       userAccount: newUserAccount.publicKey,
  //       user: anchor.getProvider().publicKey,
  //     },
  //     )
  //   .signers([newUserAccount])
  //   .rpc();
  //   const newPostAccount0 = await program.account.user.fetch(newUserAccount.publicKey);
  //   console.log(newPostAccount0);
    
  //   let userDetails = await program.account.user.fetch(newUserAccount.publicKey);
  //   console.log("Your transaction signature", tx);
  // });

  // it("updates username", async () => {
  //  const ix = await program.methods.updateUsername("&mut username")
  //  const userAccountAddress = (await ix.pubkeys()).userAccount
  // //  console.log(userAccountAddress.toString());

  //  const tx = await ix.rpc()
  //  console.log("Your transaction signature", tx);

  //  let userDetails = await program.account.user.fetch(userAccountAddress);
  //  console.log(`Name: ${userDetails.username}` )

  //   const newPostAccount0 = await program.account.user.fetch(newUserAccount.publicKey);
  //   console.log(newPostAccount0);

  // });

});
