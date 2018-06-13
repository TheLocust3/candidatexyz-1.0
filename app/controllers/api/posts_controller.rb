class Api::PostsController < Api::ApiController
    before_action :authenticate_user!, only: [ :create, :update, :destroy ]

    def index
        render :json => Post.where( :post_type => params[:post_type] )
    end

    def show
        render :json => Post.where( :post_type => params[:post_type], :url => params[:url] ).first
    end

    def create
        post = Post.new(create_params(params))

        if post.save
            render :json => Post.find(post.id)
        else
            render_errors(post)
        end
    end

    def update
        post = Post.find(params[:id])

        if post.update(update_params(params))
            render :json => Post.find(params[:id])
        else
            render_errors(post)
        end
    end

    def destroy
        post = Post.where( :post_type => params[:post_type], :url => params[:url] ).first
        post.destroy

        render_success
    end

    private
    def create_params(params)
        params.permit(:title, :post_type, :url, :body, :image)
    end

    def update_params(params)
        params.permit(:title, :post_type, :url, :body, :image)
    end
  end
  