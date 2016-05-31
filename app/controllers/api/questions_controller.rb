class Api::QuestionsController < ApplicationController

  def index
    render json: {questions: Question.all}
  end

  def create
    new_ques = Question.create question_params
    render json: {question: new_ques}
  end

  def show
    show_ques = Question.find params[:id]
    render json: {question: show_ques}
  end

  def update
    ques = Question.find params[:id]
    ques.update question_params
    render json: {question: ques}
  end

  def destroy
    remove_ques = Question.destroy params[:id]
    render json: {success: "Removed " + remove_ques.name}
  end


  private

  def question_params
    params.require(:question).permit(:name, :email, :subject, :description)
  end


end
