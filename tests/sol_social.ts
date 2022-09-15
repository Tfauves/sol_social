import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { SolSocial } from "../target/types/sol_social";

describe("sol_social", () => {

  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolSocial as Program<SolSocial>;
  const postAccount = anchor.web3.Keypair.generate();
  const bookmarkAccount = anchor.web3.Keypair.generate();


  // it("creates new user",async () => {
  //   const publicKey = anchor.AnchorProvider.local().wallet.publicKey;
  //   const [newUserPDA] = await anchor.web3.PublicKey.findProgramAddress([
  //     utf8.encode('new_user5'),
  //     publicKey.toBuffer(),
  //   ],
  //   program.programId
  //   );
    
  //   console.log("newUserPDA", newUserPDA);
  //   await program.methods.newUser("SomeName", "SomeStatus").accounts({
  //     userAccount: newUserPDA,
  //     systemProgram: anchor.web3.SystemProgram.programId,
  //   })
  //   .rpc();
  //   const newUserAccount = await program.account.user.fetch(newUserPDA);
  //   console.log(newUserAccount);
   
  // })
  
  it ("updates username", async () => {
    const publicKey = anchor.AnchorProvider.local().wallet.publicKey;
    const [newUserPDA] = await anchor.web3.PublicKey.findProgramAddress([
      utf8.encode('new_user5'),
      publicKey.toBuffer(),
    ],
    program.programId
    );

    console.log("newUserPDA", newUserPDA);
    await program.methods.updateUsername("&mut username").accounts({
      userAccount: newUserPDA
      
    })
    .rpc();
    const newUserAccount = await program.account.user.fetch(newUserPDA);
    console.log(newUserAccount);

  })

  it ("updates status", async () => {
    const publicKey = anchor.AnchorProvider.local().wallet.publicKey;
    const [newUserPDA] = await anchor.web3.PublicKey.findProgramAddress([
      utf8.encode('new_user5'),
      publicKey.toBuffer(),
    ],
    program.programId
    );
    await program.methods.updateStatus("hey iam a new status update").accounts(
      {
        userAccount: newUserPDA
      }
    )
    .rpc();
    const newUserAccount = await program.account.user.fetch(newUserPDA);
    console.log(newUserAccount)
  })

  it ("adds to bookmarks", async () => {
    const publicKey = anchor.AnchorProvider.local().wallet.publicKey;
    const [newUserPDA] = await anchor.web3.PublicKey.findProgramAddress([
      utf8.encode('new_user5'),
      publicKey.toBuffer(),
    ],
    program.programId
    );

    console.log("newUserPDA", newUserPDA);
    await program.methods.addBookmarks(42).accounts(
      {
      userAccount: newUserPDA
      }
    )
    .rpc();

    const newUserAccount = await program.account.user.fetch(newUserPDA)
    console.log(newUserAccount);
  })

  // it ("sends a post", async () => {
  //   const publicKey = anchor.AnchorProvider.local().wallet.publicKey;
  //   const [newUserPDA] = await anchor.web3.PublicKey.findProgramAddress([
  //     utf8.encode('new_user4'),
  //     publicKey.toBuffer(),
  //   ],
  //   program.programId
  //   );
    
  //   await program.methods.sendPost("this damn dog", "tfauves").accounts(
  //     {
  //       author: newUserPDA
  //     }
  //   )
  //   .rpc();
  //   const newUserAccount = await program.account.post.fetch(newUserPDA)
  //   console.log(newUserAccount);
  // })

  it ("sends a post", async () => {
   const tx = await program.methods.sendPost("this is a post", "tfauves").accounts(
    {
      post: postAccount.publicKey,
      author: anchor.getProvider().publicKey
    },
    )
    .signers([postAccount])
    .rpc();

    const newPostAccount0 = await program.account.post.fetch(postAccount.publicKey);
    console.log(newPostAccount0);
 
   })

});
