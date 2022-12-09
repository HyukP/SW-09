package com.pickmen.backend.board.controller;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pickmen.backend.Type.PostStatusType;
import com.pickmen.backend.Type.StatusType;
import com.pickmen.backend.board.model.Food;
import com.pickmen.backend.board.model.Post;
import com.pickmen.backend.board.repository.FoodRepository;
import com.pickmen.backend.board.repository.PostRepository;
import com.pickmen.backend.board.service.PostService;
import com.pickmen.backend.config.auth.PrincipalDetail;
import com.pickmen.backend.dto.ResponseDto;
import com.pickmen.backend.user.model.User;
import com.pickmen.backend.user.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class PostController {

  @Autowired private PostService postService;

  @Autowired private UserRepository userRepository;

  @Autowired private PostRepository postRepository;

  @Autowired private FoodRepository foodRepository;

  // @AuthenticationPrincipal PrincipalDetail principalDetail
  // 위 코드를 통해 세션에 저장된 사용자 정보를 가져올 수 있다.

  @GetMapping("/post/getAll")
  public Page<Post> postList(@PageableDefault(size = 5, sort="createDate",direction = Sort.Direction.DESC)Pageable pageable){
    return postService.getPostList(pageable);
  }


  @GetMapping("post/get/{post_id}")
  public ResponseDto<Post> postList(@PathVariable Long post_id){
    try {
      return new ResponseDto<Post>(HttpStatus.OK.value(),postRepository.findById(post_id).get());
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseDto<Post>(HttpStatus.INTERNAL_SERVER_ERROR.value(),null);
    }
  }
  
  @PostMapping("post/delivery/{posdId}")
  public @ResponseBody ResponseDto<Post> postDelivery(@AuthenticationPrincipal PrincipalDetail principalDetail, @PathVariable long postId){
    try{
      Post getPost=postRepository.getById(postId);
      getPost.setPostType(PostStatusType.DELIVERY);
      getPost.setDeliveryId(principalDetail.getUser());
      principalDetail.getUser().setStatus(StatusType.DELIVERY);
      return new ResponseDto<>(HttpStatus.OK.value(),null);
    }
    catch(Exception e){
      e.printStackTrace();
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(),null);
  }
}

  @Transactional
  @PostMapping("post/delete")
  public @ResponseBody ResponseDto<Post> postDelete(@RequestParam(required = true, name = "postId" ) String post_id, @AuthenticationPrincipal PrincipalDetail principalDetail){
    try{
      long postId=Long.parseLong(post_id);
      Post post=postRepository.findById(postId).get();
      User author=userRepository.findById(post.getAuthorId().getId()).get();
      author.setStatus(StatusType.NORMAL);
      post.setPostType(PostStatusType.TERMINATE);
      
    
      if(post.getAuthorId()!=null){
      User delivery=userRepository.findById(post.getAuthorId().getId()).get();
      delivery.setStatus(StatusType.NORMAL);
      }

    //Post post=postService.getPost(post_id);
    //if(post.getAuthorId().getId()==principalDetail.getUserId()){
  
      //postService.delete(postId);
      return new ResponseDto<>(HttpStatus.OK.value(),null);
    //}
    //else{
    //  return "삭제 실패";
    //}
    }
    catch(Exception e){
      e.printStackTrace();
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(),null);
    }
  }

     
  
  @Transactional
  @PostMapping("/post/write")
  public @ResponseBody ResponseDto<Post> postReply(@AuthenticationPrincipal PrincipalDetail principalDetail, Post post,
   @RequestParam("priFoodName") String prifoodname,@RequestParam("subFoodName") String subfoodname,
    @RequestParam("priFoodPrice") String prifoodprice, @RequestParam("subFoodPrice") String subfoodprice, 
    @RequestParam("priFooodLocation") String prifoodlocation, @RequestParam("subFoodLocation") String subfoodlocation){
      try {
        Post newPost=null;
          if(principalDetail.getUser().getStatus()==StatusType.NORMAL){
            Food priFood=new Food().builder().foodname(prifoodname).foodprice(prifoodprice)
            .foodlocation(prifoodlocation).build();
   

            Food subFood=new Food().builder().foodname(subfoodname).foodprice(subfoodprice)
            .foodlocation(subfoodlocation).build();
          
            foodRepository.save(priFood);
            foodRepository.save(subFood);
            newPost=new Post().builder().authorId(principalDetail.getUser())
           .pickUpTime(post.getPickUpTime()).pickupLocation(post.getPickupLocation()).postType(PostStatusType.WAITING).build();
            List<Food> foodList=newPost.getFood();
            foodList.add(priFood);
            foodList.add(subFood);

            
            User author=principalDetail.getUser();
            newPost.setAuthorNickName(author.getNickname());
            author.setStatus(StatusType.WRITE);
          }

        
          
          return new ResponseDto<>(HttpStatus.OK.value(),postRepository.save(newPost));

           } catch (Exception e) {
          e.printStackTrace();
          
          return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(),null);
      }
  } 


  
  @PostMapping("post/update/{post_id}")
  public String postUpdate(@PathVariable Long post_id,Post board,@AuthenticationPrincipal PrincipalDetail principalDetail){
    try{
    postService.update(post_id, board);
    return "수정 완료";
    }
    catch(Exception e){
      e.printStackTrace();
      return "수정 실패";
    }
  }


}